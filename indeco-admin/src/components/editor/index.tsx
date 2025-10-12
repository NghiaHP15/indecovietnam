/* eslint-disable import/order */
import '@/utils/highlight';
import ReactQuill, { Quill, ReactQuillProps } from 'react-quill';
import { formats } from './toolbar';
import { useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';
import { StyledEditor } from './styles';
import { useEffect, useRef } from 'react';
import { uploadImage } from '@/api/services/uploadService';

const Delta = Quill.import("delta");

interface Props extends ReactQuillProps {
  sample?: boolean;
}
export default function Editor({ id = 'slash-quill', sample = false, ...other }: Props) {
  const token = useThemeToken();
  const quillRef = useRef<any>(null);
  const { themeMode } = useSettings();
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "code-block"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    // Chặn sự kiện paste ảnh (dạng <img src="data:...">)
    quill.getModule("clipboard").addMatcher("IMG", (node: any, delta: any) => {
      const src = node.getAttribute("src");

      if (src && src.startsWith("data:")) {
        fetch(src)
          .then((res) => res.blob())
          .then(async (blob) => {
            const formData = new FormData();
            formData.append('image', blob as Blob);
            try {
              const res = await uploadImage(formData);

              const imageUrl = res.url; 

              // Lấy vị trí con trỏ hiện tại
              const range = quill.getSelection(true);
              if (range) {
                // Chèn ảnh bằng URL thật
                quill.insertEmbed(range.index, "image", imageUrl);
                quill.setSelection(range.index + 1);
              }
            } catch (err) {
              console.error("Upload failed:", err);
            }
          });
          return new Delta();
      }

      // Trả lại delta mặc định (để tránh lỗi khi paste text)
      return delta;
    });
  }, []);

  return (
    <StyledEditor $token={token} $thememode={themeMode}>
      <ReactQuill
        ref={quillRef}
        className='rounded-md'
        formats={formats}
        modules={modules}
        {...other}
        placeholder=""
      />
    </StyledEditor>
  );
}
