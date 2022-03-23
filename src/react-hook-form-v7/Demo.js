import { useForm } from "react-hook-form"

export default function Demo() {
   const { register, handleSubmit, formState: { errors } } = useForm()

   const onSubmit = (formData) => {
      console.log(formData)
   }

   // after validate success, call onSubmit()
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <h1>React Hook Form</h1>
         <label htmlFor="name">Name</label>
         <input type="text" name="name" id="name" placeholder="Name" {...register("name", { required: true })} />
         < label htmlFor="password">Password</label>
         <input type="password" name="password" id="password" placeholder="Password" {...register("password", { required: true, minLength: 6 })} />
         <label htmlFor="email">Email</label>
         <input type="email" name="email" id="email" placeholder="Email" {...register("email", { required: true, pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i })} />
         {/* Handle Errors */}
         {Object.keys(errors).length !== 0 &&
            <ul className="error-container">
               {errors.name?.type === 'required' && <li>Name is required</li>}
               {errors.password?.type === 'required' && <li>Password is required</li>}
               {errors.password?.type === 'minLength' && <li>Password must be at least 6 characters long</li>}
               {errors.email?.type === 'required' && <li>Email is required</li>}
               {errors.email?.type === 'pattern' && <li>Invalid Email</li>}
            </ul>}
         <button type="submit">Submit</button>
      </form>
   )
}