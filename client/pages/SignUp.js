import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as yup from "yup";

// Define validation schema
const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
    ),
  image: yup.string(),
});

export default function SignUpModal({ submitFunction }) {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Sign Up</h2>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              image: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              submitFunction(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    First Name:
                  </label>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="border border-gray-400 p-2 w-full rounded-lg"
                  />
                  <ErrorMessage
                    name="firstName"
                    render={(msg) => (
                      <div className="text-red-500">
                        <div>{msg}</div>
                      </div>
                    )}
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Last Name:
                  </label>
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="border border-gray-400 p-2 w-full rounded-lg"
                  />
                  <ErrorMessage
                    name="lastName"
                    render={(msg) => (
                      <div className="text-red-500">
                        <div>{msg}</div>
                      </div>
                    )}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Email:
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="border border-gray-400 p-2 w-full rounded-lg"
                  />
                  <ErrorMessage
                    name="email"
                    render={(msg) => (
                      <div className="text-red-500">
                        <div>{msg}</div>
                      </div>
                    )}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Password:
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="border border-gray-400 p-2 w-full rounded-lg"
                  />
                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <div className="text-red-500">
                        <div>{msg}</div>
                      </div>
                    )}
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Profile Image URL (optional):
                  </label>
                  <Field
                    id="image"
                    name="image"
                    type="text"
                    className="border border-gray-400 p-2 w-full rounded-lg"
                  />
                  <ErrorMessage
                    name="image"
                    render={(msg) => (
                      <div className="text-red-500">
                        <div>{msg}</div>
                      </div>
                    )}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-gray-700 mt-4">
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
