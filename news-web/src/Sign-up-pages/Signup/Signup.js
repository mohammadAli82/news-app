// Signup.js
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputControl from "../InputControl/InputControl";
import { collection } from "firebase/firestore";
import { db } from "../../firebase";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { auth } from "../../firebase";
import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      pass: "",
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      email: Yup.string().email("Invalid email address"),
      pass: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "Must 8 Char, Upper & Lower Case, Num & Special Char"
        ),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.pass
        );
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        await setDoc(doc(collection(db, 'users'), user.uid), {
          Name: values.name,
          Email: values.email,
          Password: values.pass,
        });
        navigate("/login");
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          setFieldError(
            "email",
            "Email already in use. Please choose another one."
          );
        } else {
          setFieldError("general", err.message);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>

        <form onSubmit={formik.handleSubmit}>
          <InputControl
            label="Name"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            required
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.error}>{formik.errors.name}</div>
          ) : null}

          <InputControl
            label="Email"
            placeholder="Enter email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.error}>{formik.errors.email}</div>
          ) : null}

          <InputControl
            label="Password"
            placeholder="Enter password"
            value={formik.values.pass}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="pass"
            type="password"
            required
          />
          {formik.touched.pass && formik.errors.pass ? (
            <div className={styles.error}>{formik.errors.pass}</div>
          ) : null}

          {formik.errors.general && (
            <div className={styles.error}>{formik.errors.general}</div>
          )}

          <div className={styles.footer}>
            <button type="submit" disabled={formik.isSubmitting}>
              Signup
            </button>
            <p>
              Already have an account?{" "}
              <span>
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

