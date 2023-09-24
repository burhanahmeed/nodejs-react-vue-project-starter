import withAuth from "../../hoc/withAuth";
import Button from '../../components/common/Button';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from "react";
import usersApi from "../../apis/users";
import { useDebounce } from "../../utils/debounce";

export default withAuth(UsersIndex, 'protected');
function UsersIndex () {
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 1000);

  const fetchData = async () => {
    try {
      const resp: any = await usersApi.list({
        page: currentPage + 1,
        size: 5,
        search: debouncedValue
      });

      setUsers(resp.data);
      setTotalPage(resp.totalPages);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [currentPage, debouncedValue]);

  return (
    <>
      <div className="py-4 flex justify-between">
        <Button className="text-xs" text="Add New User" onClick={() => {}} />
        <input
          placeholder="Search"
          aria-label="Search"
          type="text"
          name="search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value)
          }}
        />
      </div>
      <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Role
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                {users.map((e: any, i: number) => {
                  return (
                    <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {e.name}
                      </th>
                      <td className="px-6 py-4">
                        {e.email}
                      </td>
                      <td className="px-6 py-4">
                        {e.is_active ? 'Active' : 'Disabled'}
                      </td>
                      <td className="px-6 py-4">
                        {e.role.name}
                      </td>
                      <td className="px-6 py-4">
                        <Button className="text-xs bg-gray-500 text-white" text="Edit" onClick={() => {}} />
                        <Button className="text-xs bg-red-500 text-white" text="Delete" onClick={() => {}} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
          </table>
          <div className="py-4">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next"
              onPageChange={(e) => { setCurrentPage(e.selected) }}
              forcePage={currentPage}
              pageRangeDisplayed={3}
              pageCount={totalPage}
              previousLabel="previous"
              renderOnZeroPageCount={null}
              className="inline-flex -space-x-px text-sm"
              pageLinkClassName="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              breakClassName="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300"
              nextClassName="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              previousClassName="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              activeLinkClassName="text-red-500 font-black"
            />
          </div>
      </div>
    </>
  )
}
