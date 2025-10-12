// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useCallback, useEffect, useState } from "react";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
// } from "@/components/ui/select";
// import provinceApi from "@/lib/provinceAPI";

// // ✅ Type chung để tái sử dụng
// export interface LocationValue {
//   city: string;
//   cityName: string;
//   district: string;
//   districtName: string;
//   ward: string;
//   wardName: string;
// }

// interface Error {
//   city?: string;
//   district?: string;
//   ward?: string;
// }

// interface LocationSelectorProps {
//   value: LocationValue;
//   error: Error;
//   onChange: (val: LocationValue) => void;
// }

// const LocationSelector: React.FC<LocationSelectorProps> = ({ value, error, onChange }) => {
//   const [provinces, setProvinces] = useState<any[]>([]);
//   const [districts, setDistricts] = useState<any[]>([]);
//   const [wards, setWards] = useState<any[]>([]);
  
//   useEffect(() => {
//     provinceApi.get("/p/").then((res) => setProvinces(res.data));
//   }, []);

//   useEffect(() => {
//     if (value.city) {
//       provinceApi.get(`/p/${value.city}?depth=2`).then((res) => setDistricts(res.data.districts || []));
//       setWards([]);
//     }
//   }, [value.city]);

//   useEffect(() => {
//     if (value.district) {
//       provinceApi.get(`/d/${value.district}?depth=2`).then((res) => setWards(res.data.wards || []));
//     }
//   }, [value.district]);

//   const updateLocation = (updates: Partial<LocationValue>) => {
//     onChange({ ...value, ...updates });
//   };

//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {/* Chọn tỉnh */}
//       <div>
//         <Select
//           value={value.city}
//           onValueChange={(code) => {
//             const province = provinces.find((p) => p.code.toString() === code);
//             updateLocation({
//               city: code,
//               cityName: province?.name || "",
//               district: "",
//               districtName: "",
//               ward: "",
//               wardName: "",
//             });
//           }}
//         >
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Chọn tỉnh / thành phố" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {provinces.map((p) => (
//                 <SelectItem key={p.code} value={p.code.toString()}>
//                   {p.name}
//                 </SelectItem>
//               ))}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//         {error?.city && <p className="text-red-500">{error.city}</p>}
//       </div>

//       {/* Chọn huyện */}
//       <div>
//         <Select
//           value={value.district}
//           disabled={!value.city}
//           onValueChange={(code) => {
//             const district = districts.find((d) => d.code.toString() === code);
//             updateLocation({
//               district: code,
//               districtName: district?.name || "",
//               ward: "",
//               wardName: "",
//             });
//           }}
//         >
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Chọn quận / huyện" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {districts.map((d) => (
//                 <SelectItem key={d.code} value={d.code.toString()}>
//                   {d.name}
//                 </SelectItem>
//               ))}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//         {error?.district && <p className="text-red-500">{error.district}</p>}
//       </div>

//       {/* Chọn xã */}
//       <div>
//         <Select
//           value={value.ward}
//           disabled={!value.district}
//           onValueChange={(code) => {
//             const ward = wards.find((w) => w.code.toString() === code);
//             updateLocation({
//               ward: code,
//               wardName: ward?.name || "",
//             });
//           }}
//         >
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Chọn xã / phường" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {wards.map((w) => (
//                 <SelectItem key={w.code} value={w.code.toString()}>
//                   {w.name}
//                 </SelectItem>
//               ))}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//         {error?.ward && <p className="text-red-500">{error.ward}</p>}
//       </div>
//     </div>
//   );
// };

// export default LocationSelector;
