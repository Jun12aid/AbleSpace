import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
  mutationFn: loginUser,
  onSuccess: async () => {
    // 🔴 force refetch of /auth/me
    await queryClient.invalidateQueries(["me"]);
    navigate("/dashboard");
  },
});

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    // console.log("login render"),
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full border p-2 mb-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="w-full border p-2 mb-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {mutation.isError && (
          <p className="text-red-500 text-sm mt-2">
            Invalid credentials
          </p>
        )}

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700"
        >
          {mutation.isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
