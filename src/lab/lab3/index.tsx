import { useState, useEffect } from 'react';
import { StudentService } from './model';
export interface Lab3Props {}

export default function Lab3(props: Lab3Props) {
   const [data, setData] = useState(() => {
      const students = new StudentService();
      students.setData();
      return students.data;
   });
   const [code, setCode] = useState('');
   const [name, setName] = useState('');
   const [toan, setToan] = useState(0);
   const [li, setLi] = useState(0);
   const [hoa, setHoa] = useState(0);
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newStudent = {
         code,
         name,
         toan,
         li,
         hoa,
      };
      data.push(newStudent);
      setData([...data]);
   };
   useEffect(() => {}, []);
   return (
      <div className="container">
         <div className="row">
            <div className="col-md-4">
               <form action="" method="post" onSubmit={handleSubmit}>
                  <legend>Title</legend>
                  <div className="form-group">
                     <label htmlFor="code">Mã</label>
                     <input
                        type="text"
                        className="form-control"
                        placeholder="...mã"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                     />
                  </div>
                  <div className="form-group">
                     <label htmlFor="name">Tên</label>
                     <input
                        type="text"
                        className="form-control"
                        placeholder="...tên"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                  </div>
                  <div className="row">
                     <div className="col-md-4">
                        <div className="form-group">
                           <label htmlFor="toan">Toán</label>
                           <input
                              type="number"
                              className="form-control"
                              placeholder="...toán"
                              id="toan"
                              value={toan}
                              onChange={(e) => setToan(Number(e.target.value))}
                           />
                        </div>
                     </div>
                     <div className="col-md-4">
                        <div className="form-group">
                           <label htmlFor="li">Lí</label>
                           <input
                              type="number"
                              className="form-control"
                              placeholder="...lí"
                              id="li"
                              value={li}
                              onChange={(e) => setLi(Number(e.target.value))}
                           />
                        </div>
                     </div>
                     <div className="col-md-4">
                        <div className="form-group">
                           <label htmlFor="hoa">Hóa</label>
                           <input
                              type="number"
                              className="form-control"
                              placeholder="...hóa"
                              id="hoa"
                              value={hoa}
                              onChange={(e) => setHoa(Number(e.target.value))}
                           />
                        </div>
                     </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                     Thêm
                  </button>
               </form>
            </div>
            <div className="col-md-8">
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
                     {data.map((s, sidx) => {
                        return (
                           <tr key={sidx}>
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
         </div>
      </div>
   );
}
