import * as React from 'react';
import { StudentService } from './model';
export interface Lab3Props {}

export default function Lab3(props: Lab3Props) {
   const students = new StudentService();
   students.setData();
   return (
      <div className="container">
         <h2>Danh sách sinh viên</h2>
         <table className="table">
            <thead>
               <tr>
                  <th>Mã</th>
                  <th>Họ tên</th>
                  <th>Toán</th>
                  <th>Lí</th>
                  <th>Hóa</th>
                  {/* <th>Điểm TB</th>
                  <th>Xếp loại</th> */}
               </tr>
            </thead>
            <tbody>
               {students.data.map((s, sidx) => {
                  return (
                     <tr>
                        <td>{s.code}</td>
                        <td>{s.name}</td>
                        <td>{s.toan}</td>
                        <td>{s.li}</td>
                        <td>{s.hoa}</td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
}
