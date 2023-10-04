import withAuth from "../hoc/withAuth";
import { useEffect, useState } from "react";
import rolesApi from "../apis/roles";

export default withAuth(UsersIndex, 'protected');
function UsersIndex () {
  const [roles, setRoles] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const resp: any = await rolesApi.list();

      setRoles(resp.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Created At
                      </th>
                  </tr>
              </thead>
              <tbody>
                {roles.map((e: any, i: number) => {
                  return (
                    <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {e.name}
                      </th>
                      <td className="px-6 py-4">
                        {e.createdAt}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
          </table>
      </div>
    </>
  )
}
