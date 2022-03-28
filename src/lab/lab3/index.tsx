import { useState, useEffect, useCallback } from 'react';
import { StudentService } from './model';
export interface Lab3Props {}

export default function Lab3(props: Lab3Props) {
   const initData = useCallback(() => {
      const students = new StudentService();
      students.setData();
      return students.data;
   }, []);

   const [edit, setEdit] = useState(false);
   const [data, setData] = useState(initData());
   const [code, setCode] = useState('');
   const [search, setSearch] = useState('');
   const [name, setName] = useState('');
   const [toan, setToan] = useState(0);
   const [li, setLi] = useState(0);
   const [hoa, setHoa] = useState(0);
   const clearInput = () => {
      setCode('');
      setName('');
      setToan(0);
      setLi(0);
      setHoa(0);
   };
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
      clearInput();
   };

   const handleDelete = (id: string) => {
      const newData = data.filter((item) => item.code !== id);
      setData(newData);
   };

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      if (e.target.value === '') {
         setData(initData());
      } else {
         const newData = initData().filter((item) =>
            item.code.toLowerCase().includes(e.target.value.toLowerCase())
         );
         setData(newData);
      }
   };

   const handleEdit = (code: string) => {
      setEdit(true);
      const objIndex = data.findIndex((obj) => obj.code == code);
      setCode(code);
      setName(data[objIndex].name);
      setToan(data[objIndex].toan);
      setLi(data[objIndex].li);
      setHoa(data[objIndex].hoa);
      localStorage.setItem('key', objIndex.toString());
   };

   const handleChange = () => {
      const objIndex = localStorage.getItem('key');
      if (objIndex) {
         data[+objIndex].code = code;
         data[+objIndex].name = name;
         data[+objIndex].toan = toan;
         data[+objIndex].li = li;
         data[+objIndex].hoa = hoa;
      }
      setData([...data]);
      clearInput();
      setEdit(false);
   };
   useEffect(() => {}, []);
   return (
      <div className="container">
         {edit && (
            <div className="pop-up">
               <form action="" method="post" onSubmit={handleChange}>
                  <legend>Form</legend>
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
                     Save Change
                  </button>
               </form>
            </div>
         )}
         <div className="row">
            <div className="col-md-4">
               <form action="" method="post" onSubmit={handleSubmit}>
                  <legend>Form</legend>
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
               <div className="form-group">
                  <label htmlFor="search-code">Search</label>
                  <input
                     type="text"
                     className="form-control"
                     placeholder="...mã"
                     id="search-code"
                     value={search}
                     onChange={handleSearch}
                  />
               </div>
               <h2>Danh sách sinh viên</h2>
               <table className="table">
                  <thead>
                     <tr>
                        <th>Mã</th>
                        <th>Họ tên</th>
                        <th>Toán</th>
                        <th>Lí</th>
                        <th>Hóa</th>
                        <th></th>
                        <th></th>
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
                              <td>
                                 <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => handleEdit(s.code)}
                                 >
                                    Edit
                                 </button>
                              </td>
                              <td>
                                 <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(s.code)}
                                 >
                                    Delete
                                 </button>
                              </td>
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
