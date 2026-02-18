import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sileo } from "sileo";
import api from "../api/axios";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(8px)",
    transition: { duration: 0.4, ease: "easeInOut" as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const toastStyle = {
    fill: "#1e293b",
    styles: {
      title: "!text-white",
      description: "!text-slate-400",
    },
  };

  const validateFields = (): boolean => {
    if (!email.trim()) {
      sileo.warning({ title: "Campo requerido", description: "Ingresa tu correo electrónico.", ...toastStyle });
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      sileo.warning({ title: "Correo inválido", description: "Ingresa un correo electrónico válido.", ...toastStyle });
      return false;
    }

    if (!password) {
      sileo.warning({ title: "Campo requerido", description: "Ingresa tu contraseña.", ...toastStyle });
      return false;
    }

    if (password.length < 6) {
      sileo.warning({ title: "Contraseña muy corta", description: "Debe tener al menos 6 caracteres.", ...toastStyle });
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      sileo.warning({ title: "Falta mayúscula", description: "La contraseña debe incluir al menos una letra mayúscula.", ...toastStyle });
      return false;
    }

    if (!/[0-9]/.test(password)) {
      sileo.warning({ title: "Falta número", description: "La contraseña debe incluir al menos un número.", ...toastStyle });
      return false;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      sileo.warning({ title: "Falta símbolo", description: "La contraseña debe incluir al menos un símbolo (!@#$%...).", ...toastStyle });
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    try {
      setLoading(true);

      const res = await api.post("/login", { email, password });

      localStorage.setItem("token", res.data.token);
      sileo.success({ title: "Inicio de sesión exitoso", description: "Redirigiendo al directorio...", ...toastStyle });
      setSuccess(true);

      setTimeout(() => navigate("/students"), 600);
    } catch {
      sileo.error({ title: "Error de autenticación", description: "Credenciales incorrectas. Verifica tu correo y contraseña.", ...toastStyle });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-slate-900 flex items-center justify-center overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center"
            >
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="w-10 h-10 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white text-lg font-semibold"
            >
              Bienvenido
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-[#161c28] p-10 rounded-xl shadow-2xl border border-slate-800 w-[380px]"
          >
            <motion.div variants={itemVariants} className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                </svg>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl font-black text-white mb-2 text-center"
            >
              Web Estudiantes
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-center mb-8"
            >
              Inicia sesión para continuar
            </motion.p>

            <motion.div variants={itemVariants} className="mb-4">
              <input
                placeholder="Usuario o correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 text-white px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500 transition-colors duration-200"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4 relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 text-white px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500 transition-colors duration-200"
              />
              <button
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 text-slate-400 hover:text-white transition-colors"
              >
                {show ? "🙈" : "👁️"}
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mb-6 text-sm text-slate-400"
            >
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Recordar sesión
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(16,185,129,0.3)" }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-emerald-500 text-black py-3 rounded-lg font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-2"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                  />
                  Ingresando...
                </motion.span>
              ) : (
                "Ingresar"
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
