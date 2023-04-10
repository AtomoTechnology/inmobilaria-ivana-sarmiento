import { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import http from "./../../api/axios";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../context/authContext";
import Box from "../../components/Box";
import CustomInput from "../../components/CustomInput";
import FormError from "../../components/FormError";
import InlineDots from "../../components/loadings/Inlinedots";
import { validateForm } from "../../helpers/form";

const SignIn = () => {

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>();
  const [loginError, setLoginError] = useState<string | null>(null);

  const { signIn } = useContext(AuthContext);
  const { values, handleInputChange, email, password, reset } = useForm({
    email: "",
    password: "",
  });


  const handleSubmitLogin = async (e: any) => {
    e.preventDefault();
    const { error, ok } = validateForm({ ...values })
    setErrors(error)
    if (!ok) return false
    setLoading(true);
    try {
      const r = await http.post("/auth/signin", values);
      if (r.data.ok) {
        signIn(r.data);
        reset();
        setLoading(false);
      } else {
        setLoginError(r.data.message);
      }
    } catch (error: any) {
      if (error.response) {
        setLoginError(error.response.data.message);
        setTimeout(() => {
          setLoginError(null);
        }, 8000);
      }
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="flex h-screen w-screen dark:bg-gray-900 items-center justify-center">
      <Box className=" w-full max-w-[420px] mx-3 sm:mx-0 sm:w-96 ">
        <form
          onSubmit={handleSubmitLogin}
          className="flex items-center justify-between flex-col "
        >
          <h3 className="title-form self-start mb-4 !text-xl sm:!text-3xl">Inicia sesión</h3>

          {loginError && <FormError text={loginError} />}

          <CustomInput
            type="email"
            placeholder="example@gmail.com"
            onChange={(val) => handleInputChange(val, "email")}
            hasError={errors?.email}
            required
            label="Email"
            errorText="Email obligatorio y válido."
          />

          <CustomInput
            type="password"
            placeholder=".lk8Tx9W/"
            onChange={(val) => handleInputChange(val, "password")}
            required
            label="Contraseña"
            hasError={errors?.password}
            errorText="Contraseña obligatoria ."
          />

          <fieldset>
            <button disabled={loading} className="btn gradient" type="submit">
              {loading ? (
                <div className="flex items-center gap-4">
                  <span>Espere</span>
                  <InlineDots />
                </div>
              ) : (
                <span>Inicia sesión</span>
              )}
            </button>
          </fieldset>

          <div className="register-section text-sx my-2">
            <span className="text-sm">
              <Link
                to="/forget-password"
                className="text-pink-700 dark:text-slate-500 ml-1 hover:underline  p-1"
              >
                ¿Olvidaste tu contraseña ?
              </Link>
            </span>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default SignIn;
