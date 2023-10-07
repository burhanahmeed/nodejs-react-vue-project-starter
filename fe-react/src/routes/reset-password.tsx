import { useState } from "react"
import authApi from "../apis/auth";
import withAuth from "../hoc/withAuth";
import { useSearchParams } from "react-router-dom";

export default withAuth(ResetPassword, 'non-protected');

function ResetPassword() {
  const [searchParams] = useSearchParams();
 
  const [form, setForm] = useState<any>({
    password: undefined,
    confirmPassword: undefined
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((el: any) => ({
      ...el,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchParams?.get('token')) {
      alert('Token is required');
      return false;
    }

    if (!form.password) {
      alert('Password is required');
      return false;
    }

    if (form.password !== form.confirmPassword) {
      alert('Password and confirm password must match');
      return false;
    }

    try {
      const resp: any = await authApi.resetPassword(form.password, searchParams.get('token') as string)

      setForm({
        password: '',
        confirmPassword: ''
      });

      if (resp.status === 'success') {
        alert('Password has been reset');
      }

      window.location.href = '/login';
    } catch (error) {
      alert(error?.response?.data?.error?.message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create new password
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}