import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";
import { UserContext } from "../context/UserProvider";
import { NavLink } from "react-router-dom";
import React from "react";

const Login = () => {
  useTitle("Iniciar Sesion");
  const { signIn } = useContext(UserContext);
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persists, setPersist] = usePersist("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setPersist(true);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      setPersist(true);
      signIn(true); //from userProvider of UserContext

      setTimeout(navigate("/"), 10000);
    } catch (err) {
      if (!err.status) {
        setErrMsg("Sin Respuesta de Servidor");
      } else if (err.status === 400) {
        setErrMsg("Email o Contraseña no introducida");
      } else if (err.status === 401) {
        setErrMsg(
          "⚠ Acceso Invalido, verifique las credenciales que proporcionó"
        );
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  //const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg text-danger" : "offscreen";

  if (isLoading) return <PulseLoader color={"#FFF"} />;

  const content = (
    <>
      <br />
      <br />
      <br />
      <br />
      <main style={{ marginBottom: "270px" }}>
        <div className="content">
          <div className="row">
            <div className="col-md-4 mx-auto">
              <div className="card mt-4 text-center">
                <div className="card-header">
                  <div id="logo-container text-center">
                    <svg
                      width="150"
                      id="svg"
                      height="55"
                      viewBox="0 0 939 147"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_982_576)">
                        <path
                          d="M93.1269 80.9309C92.2788 83.0309 91.0269 84.9088 89.3711 86.5646C87.7153 88.2203 85.6355 89.5328 83.0913 90.5223C80.5471 91.5117 77.5788 91.9963 74.1461 91.9963H58.6384V56.6194H74.1461C77.5788 56.6194 80.5471 57.104 83.0913 58.0934C85.6355 59.0828 87.7153 60.3953 89.3711 62.0511C91.0067 63.7069 92.2586 65.5848 93.1269 67.6848C93.975 69.7848 94.4192 72.0059 94.4192 74.3078C94.4192 76.6098 93.9951 78.8107 93.1269 80.9309Z"
                          fill="#FA7C1F"
                        />
                        <path
                          d="M220.803 3.63477L154.168 144.981H193.745L204.084 122.971H270.961L281.36 144.981H321.744L255.534 3.63477H220.803ZM217.391 94.7021L228.678 70.6732C230.152 67.4425 231.505 64.454 232.717 61.6876C233.928 58.9213 235.079 56.2357 236.149 53.6107C236.694 52.278 237.219 50.9251 237.724 49.5723C238.148 50.7838 238.552 51.9953 238.976 53.2069C239.925 55.8319 240.995 58.5578 242.207 61.3848C243.418 64.2117 244.771 67.3011 246.245 70.6732L257.614 94.7021H217.391Z"
                          fill="#333333"
                        />
                        <path
                          d="M452.59 3.63477H305.186V38.1636H358.09V144.981H398.071V38.1636H452.59V3.63477Z"
                          fill="#333333"
                        />
                        <path
                          d="M501.88 3.63477L435.245 144.981H474.822L485.16 122.971H552.037L562.436 144.981H602.821L536.61 3.63477H501.88ZM498.467 94.7021L509.755 70.6732C511.229 67.4425 512.582 64.454 513.793 61.6876C515.005 58.9213 516.156 56.2357 517.226 53.6107C517.771 52.278 518.296 50.9251 518.801 49.5723C519.225 50.7838 519.629 51.9953 520.053 53.2069C521.002 55.8319 522.072 58.5578 523.284 61.3848C524.495 64.2117 525.848 67.3011 527.322 70.6732L538.69 94.7021H498.467Z"
                          fill="#333333"
                        />
                        <path
                          d="M749.296 29.4809V3.63477H620.268V39.9809H688.255L615.018 118.933V144.981H751.518V110.654H674.141L749.296 29.4809Z"
                          fill="#333333"
                        />
                        <path
                          d="M932.481 44.2211C928.24 35.3365 922.243 27.6029 914.51 21C906.776 14.3971 897.609 9.24808 887.048 5.55288C876.487 1.85769 864.877 0 852.216 0C839.556 0 827.945 1.85769 817.385 5.55288C806.824 9.24808 797.697 14.3971 790.024 21C782.351 27.6029 776.354 35.3365 772.053 44.2211C767.752 53.1058 765.591 62.8587 765.591 73.5C765.591 84.1413 767.711 93.7327 771.952 102.678C776.192 111.623 782.149 119.397 789.822 126C797.495 132.603 806.642 137.752 817.284 141.447C827.925 145.142 839.556 147 852.216 147C864.877 147 876.487 145.142 887.048 141.447C897.609 137.752 906.776 132.603 914.51 126C922.243 119.397 928.24 111.623 932.481 102.678C936.721 93.7327 938.841 83.9394 938.841 73.2981C938.841 62.6567 936.721 53.1058 932.481 44.2211ZM894.721 87.8365C892.5 92.2788 889.33 96.1558 885.231 99.4471C881.111 102.738 876.245 105.303 870.591 107.12C864.937 108.937 858.819 109.846 852.216 109.846C845.613 109.846 839.334 108.937 833.74 107.12C828.147 105.303 823.301 102.779 819.202 99.5481C815.103 96.3173 811.933 92.4404 809.712 87.9375C807.49 83.4346 806.38 78.6087 806.38 73.5C806.38 68.3913 807.49 63.4038 809.712 58.9615C811.933 54.5192 815.103 50.6827 819.202 47.4519C823.301 44.2211 828.147 41.6971 833.74 39.8798C839.334 38.0625 845.492 37.1538 852.216 37.1538C858.94 37.1538 864.937 38.0625 870.591 39.8798C876.245 41.6971 881.111 44.2615 885.231 47.5529C889.33 50.8442 892.5 54.7211 894.721 59.1635C896.942 63.6058 898.053 68.3913 898.053 73.5C898.053 78.6087 896.942 83.3942 894.721 87.8365Z"
                          fill="#333333"
                        />
                        <path
                          d="M148.615 47.1492C144.839 38.6078 139.448 31.0559 132.462 24.5338C125.455 18.0117 116.913 12.8828 106.817 9.18765C96.7211 5.49246 85.3529 3.63477 72.6923 3.63477H0V56.6194H39.9808V38.1636H71.6827C78.6894 38.1636 84.7673 39.1732 89.9567 41.1925C95.1461 43.2117 99.4067 45.8973 102.779 49.2694C106.151 52.6415 108.695 56.478 110.452 60.779C112.209 65.08 113.077 69.603 113.077 74.3078C113.077 79.0126 112.209 83.5357 110.452 87.8367C108.695 92.1376 106.151 95.9742 102.779 99.3463C99.4067 102.718 95.1461 105.404 89.9567 107.423C84.7673 109.442 78.6894 110.452 71.6827 110.452H39.9808V91.9963H0V144.981H72.6923C85.3529 144.981 96.6808 143.123 106.716 139.428C116.732 135.733 125.293 130.644 132.361 124.183C139.428 117.721 144.839 110.21 148.615 101.668C152.391 93.1271 154.269 84.0001 154.269 74.3078C154.269 64.6155 152.391 55.6905 148.615 47.1492Z"
                          fill="#333333"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_982_576">
                          <rect width="938.841" height="147" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h6>Inicia sesión para acceder a Datazo.com</h6>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                      <p
                        ref={errRef}
                        className={errClass}
                        aria-live="assertive"
                      >
                        {errMsg}
                      </p>
                      <label
                        htmlFor="email"
                        className="d-flex justify-content-start"
                      ></label>
                      <input
                        type="email"
                        placeholder="Ingrese su email"
                        className="form-control"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleUserInput}
                        ref={userRef}
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="password"
                        className="d-flex justify-content-start"
                      ></label>
                      <input
                        type="password"
                        placeholder="Ingrese su contraseña"
                        className="form-control"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handlePwdInput}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <br />
                      <button
                        type="submit"
                        className="btn btn-block btn-primary text-center"
                      >
                        Iniciar Sesión
                      </button>
                      &nbsp; &nbsp;
                      <NavLink to="/login/missPassword">
                        Olvidaste tu contraseña?
                      </NavLink>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="text-center">
            No estás registrado aún?&nbsp;
            <NavLink to="/signup">Registrate aquí</NavLink>
          </div>
        </div>
      </main>
    </>
  );

  return content;
};
export default Login;
