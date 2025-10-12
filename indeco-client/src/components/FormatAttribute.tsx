import React from "react";

const FormatAttribute = ({ text }: {text: string}) => {
    
    return text.split("/").map((segment, index) => {
        const [label, ...rest] = segment.split(":");
        const value = rest.join(":").trim(); // đề phòng có dấu `:` thứ 2
        return (
            <div key={index}>
            <strong className="font-medium">{label.trim()}: </strong><span>{value}</span>
            </div>
        );
    });
};

export default FormatAttribute;
