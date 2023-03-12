import UserView from "./UserView";

export default function Users() {
  let usersList = [];

  return (
    <div>
      {
        usersList.map(User => {
          return <UserView />;
        })
      }
      Users
    </div>
  )
}
