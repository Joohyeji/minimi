import { NavLink, Outlet } from 'react-router-dom'
import deleteIcon from '../../assets/img/delete_icon.png'

function Dashbaord() {
  return (
    <>
      <h1 className="text-5xl font-bold -mt-5">Dashboard</h1>
      <nav className="flex w-full gap-20 mt-5">
        <NavLink
          to="myminimies"
          className={({ isActive }) =>
            isActive
              ? 'text-lg font-bold text-black underline'
              : 'text-lg font-bold text-neutral-500'
          }
        >
          My Minimies
        </NavLink>
        <NavLink
          to="explore"
          className={({ isActive }) =>
            isActive
              ? 'text-lg font-bold text-black underline'
              : 'text-lg font-bold text-neutral-500'
          }
        >
          Explore more
        </NavLink>
      </nav>
      <section className="mt-5">
        <Outlet />
        <button className="border border-slate-50 rounded-full shadow-md hover:drop-shadow-md p-2 w-12 fixed bottom-7 right-7 hover:bg-white">
          <img src={deleteIcon} />
        </button>
      </section>
    </>
  )
}

export default Dashbaord
