export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>Tutorials</h1>
        <nav>
          <ul>
            <li>
              <a href={'/users'}>Users</a>
            </li>
            <li>
              <a href={'/roles'}>Roles</a>
            </li>
            <li>
              <a href={'/files'}>Files</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}
