import { useFormik } from "formik";
import * as Yup from "yup";
import "./signup.css";

const SignupForm = () => {
   const formik = useFormik({
      initialValues: {
         email: "",
         name: "",
         phone: "",
         password: "",
         confirmedPassword: "",
      },
      validationSchema: Yup.object({
         name: Yup.string()
            .required("Required")
            .min(4, "Must be 4 characters or more"),
         email: Yup.string()
            .required("Required")
            .matches(
               /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
               "Please enter a valid email address"
            ),
         password: Yup.string()
            .required("Required")
            .matches(
               /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
               "Password must be 7-19 characters and contain at least one letter, one number and a special character"
            ),
         //https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
         confirmedPassword: Yup.string()
            .required("Required")
            .oneOf([Yup.ref("password"), null], "Password must match"), // ref password
         phone: Yup.string()
            .required("Required")
            .matches(
               /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
               "Must be a valid phone number"
            ),
      }),
      onSubmit: (values) => {
         window.alert("Form submitted");
         console.log(values);
      },
   });

   return (
      <section className="formik-container">
         <form className="infoform"
            onSubmit={formik.handleSubmit} // onSubmit
         >
            <label className="formik-label"> Your name </label>
            <input
               className="formik-input"
               type="text"
               id="name" // id === name === ten trong initialValues
               name="name"
               value={formik.values.name} // value
               onChange={formik.handleChange} // onChange
               placeholder="Enter your name"
            />
            {formik.errors.name && (
               <p className="errorMsg"> {formik.errors.name} </p> // show error
            )}
            <label className="formik-label"> Email address </label>
            <input
               className="formik-input"
               type="email"
               id="email"
               name="email"
               value={formik.values.email}
               onChange={formik.handleChange}
               placeholder="Enter your email"
            />
            {formik.errors.email && (
               <p className="errorMsg"> {formik.errors.email} </p>
            )}
            <label className="formik-label"> Password </label>
            <input
               className="formik-input"
               type="text"
               id="password"
               name="password"
               value={formik.values.password}
               onChange={formik.handleChange}
               placeholder="Enter your password"
            />
            {formik.errors.password && (
               <p className="errorMsg"> {formik.errors.password} </p>
            )}
            <label className="formik-label"> Confirm Password </label>
            <input
               className="formik-input"
               type="text"
               id="confirmedPassword"
               name="confirmedPassword"
               value={formik.values.confirmedPassword}
               onChange={formik.handleChange}
               placeholder="Confirm your password"
            />
            {formik.errors.confirmedPassword && (
               <p className="errorMsg"> {formik.errors.confirmedPassword} </p>
            )}
            <label className="formik-label"> Phone number </label>
            <input
               className="formik-input"
               type="text"
               id="phone"
               name="phone"
               value={formik.values.phone}
               onChange={formik.handleChange}
               placeholder="Enter your phone numbers"
            />
            {formik.errors.phone && (
               <p className="errorMsg"> {formik.errors.phone} </p>
            )}
            <button type="submit" className="formik-button"> Continue </button>
         </form>
      </section>
   );
};

export default SignupForm;