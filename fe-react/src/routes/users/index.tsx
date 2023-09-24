import withAuth from "../../hoc/withAuth";
import Button from '../../components/common/Button';
import ReactPaginate from 'react-paginate';

export default withAuth(UsersIndex, 'protected');
function UsersIndex () {
  return (
    <>
      <div className="py-4">
        <Button text="Add New User" onClick={() => {}} />
      </div>
      <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Product name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Color
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Price
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">
                          Silver
                      </td>
                      <td className="px-6 py-4">
                          Laptop
                      </td>
                      <td className="px-6 py-4">
                          $2999
                      </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Microsoft Surface Pro
                      </th>
                      <td className="px-6 py-4">
                          White
                      </td>
                      <td className="px-6 py-4">
                          Laptop PC
                      </td>
                      <td className="px-6 py-4">
                          $1999
                      </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Magic Mouse 2
                      </th>
                      <td className="px-6 py-4">
                          Black
                      </td>
                      <td className="px-6 py-4">
                          Accessories
                      </td>
                      <td className="px-6 py-4">
                          $99
                      </td>
                  </tr>
              </tbody>
          </table>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next"
            onPageChange={() => {}}
            pageRangeDisplayed={3}
            pageCount={30}
            previousLabel="previous"
            renderOnZeroPageCount={null}
            className="inline-flex -space-x-px text-sm"
            pageLinkClassName="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            breakClassName="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300"
            nextClassName="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            previousClassName="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          />
      </div>
    </>
  )
}
