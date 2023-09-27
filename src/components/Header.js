export default function Header({handleLogOut}) {

  return (
    <header>
      <nav>
        <h3>Switcheroo</h3>
        <div className="welcome-logout">
          <p>Welcome User</p>
          <button onClick={handleLogOut}>Log out</button>
        </div>
        
      </nav>
    </header>
  )
}
