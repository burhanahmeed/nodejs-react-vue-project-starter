import { useEffect, useState } from "react";
import withAuth from "../../hoc/withAuth";
import fileApi from '../../apis/files';
import { useNavigate, useParams } from "react-router-dom";

export default withAuth(EditFile, 'protected');
function EditFile () {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [preveiwPhoto, setPreveiwPhoto] = useState<any>(null);

  const handleEdit = async (event: any) => {
    event.preventDefault();

    try {
      let fd = new FormData;
      fd.append('name', name);
      if (selectedPhoto) {
        fd.append('image', selectedPhoto); 
      }
  
      await fileApi.updateById(Number(id), fd);
  
      navigate(-1);
    } catch (error) {
      alert(error);
    }
  }

  const fetchData = async () => {
    const resp: any = await fileApi.getById(Number(id));
    setName(resp.data.name);
    setPreveiwPhoto(resp.data.previewImage);
  }

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id])

  return (
    <>
      <form onSubmit={handleEdit}>
      <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File</label>
          <input onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setSelectedPhoto(file);
              setPreveiwPhoto(URL.createObjectURL(file));
            }
          }} type="file" name="file" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {preveiwPhoto && <img src={preveiwPhoto} alt="Selected" />}
        </div>

        <div className="mb-6">
          <button type="submit" className="bg-green-500 text-white">Update</button>
        </div>
      </form>
    </>
  )
}