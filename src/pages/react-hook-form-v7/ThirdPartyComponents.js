import { TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

const selectOptions = [
   { value: "student", label: "Student" },
   { value: "developer", label: "Developer" },
   { value: "manager", label: "Manager" }
];

const ThirdPartyComponents = () => {

   const { handleSubmit, formState: { errors }, control } = useForm({
      // use mode to specify the event that triggers each input field 
      mode: "onChange"
   });

   const registerOptions = {
      // ...
      select: { required: "Select is required" }
   };

   const onSubmit = (data) => {
      console.log(data);
   }

   const onError = (errors) => {
      console.log(errors);
   }

   return (
      <form onSubmit={handleSubmit(onSubmit, onError)}>
         <h1>React Hook Form with 3rd Party</h1>
         {/* <input type="text" name="name" id="name" placeholder="Name" {...register("name", { required: true })} /> */}
         <Controller
            name="select"
            control={control}
            defaultValue=""
            rules={registerOptions.select}
            render={({ field }) => (
               // <Select options={selectOptions} {...field} label="Text field" />
               <TextField id="outlined-basic" label="Outlined" variant="outlined" {...field} />
            )}
         />
         {/* Error Msg */}
         <small className="text-danger">
            {errors?.select && <p>{errors.select.message}</p>}
         </small>
         <button>Submit</button>
      </form>
   );
}

export default ThirdPartyComponents; 