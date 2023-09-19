export default function Login({formData, setFormData, checkAuthentication}) {

  // Checks for a change in the input field
  function handleChange(e) {
    const {name, value} = e.target;
    setFormData(prevValue => ({
      ...prevValue,
      [name]: value,
    }));
  }

  console.log(formData);


  // Called when the user clicks on the login button or the enter key
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted this", formData);
    checkAuthentication(formData);
  }

  return (
    <>
      <div className="form-container">
        
        <form onSubmit={handleSubmit}>
          <h1>Log in To Your Account</h1>

          <label htmlFor="email">
            Email Address

            <input 
              type="email"
              id="email"
              placeholder="Email e.g. johndoe@gmail.com"
              name="email"
              onChange={handleChange}
            />
          </label>

          <label htmlFor="password">
            Password

            <input 
              type="password"
              id="password"
              placeholder="Password e.g. r0m@n123"
              name="password"
              onChange={handleChange}
            />
          </label>
          <button>Sign in</button>
        </form>
      </div>
    </>
  )
}
