import { useEffect, useState, FormEvent } from "react";
import withAuth from "../../hoc/withAuth"
import rolesApi from "../../apis/roles";
import usersApi from "../../apis/users";
import { useNavigate, useParams } from "react-router-dom";

export default withAuth(EditUser, 'protected');
function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    role_id: 1
  })

  const handleChange = (e: any) => {
    setForm((val) => ({
      ...val,
      [e.target.name]: e.target.value
    }))
  }

  const fetchRole = async () => {
    const resp: any = await rolesApi.list();
    setRoles(resp.data);
  }

  const fetchUser = async () => {
    const resp: any = await usersApi.getById(Number(id));
    setForm(resp.data);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await usersApi.updateById(Number(id), form);

      navigate(-1);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id])

  useEffect(() => {
    fetchRole();
  }, [])
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input onChange={handleChange} value={form.name} type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input onChange={handleChange} value={form.email} type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
          <select onChange={handleChange} value={form.role_id} name="role_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {roles.map((e: any, i: number) => (
              <option value={e.id} key={i}>{e.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <button type="submit" className="bg-green-500 text-white">Update</button>
        </div>
      </form>
    </>
  )
}