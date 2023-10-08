import { useState } from "react";
import withAuth from "../../hoc/withAuth";

export default withAuth(AddFile, 'protected');
function AddFile () {
  const [name, setName] = useState('');

  const handleSubmit = () => {}

  const handleChange = () => {}

  return (
    <>
      <form onSubmit={handleSubmit}>
      <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input onChange={handleChange} value={name} type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File</label>
          <input type="file" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>

        <div className="mb-6">
          <button type="submit" className="bg-green-500 text-white">Submit</button>
        </div>
      </form>
    </>
  )
}