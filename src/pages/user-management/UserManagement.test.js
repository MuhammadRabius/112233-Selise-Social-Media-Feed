import { BrowserRouter as Router } from "react-router-dom";
import { render, screen ,fireEvent,waitFor} from "@testing-library/react";
import axios from "axios"
import UserManagement from "./UserManagement";

jest.mock("axios");

const data ={
      username: "testuser",
      email: "testuser@metlife.com.bd",
      roleId:"1",
      departmentId: "1",
      locationId: "1",
}



describe("Initialized Component", () => {
 

  it("render Form all Components", () => {
    render(
      <Router>
      <UserManagement isLoad={"false"} />
      </Router>
    );
    const username =screen.getByTestId("username-mock");
    const department = screen.getByTestId("dep-mock");
    const role = screen.getByTestId("role-mock");
    const email = screen.getByTestId("email-mock");
    const location = screen.getByTestId("location-mock");
   
    expect(username).toBeInTheDocument();
    expect(department).toBeInTheDocument();
    expect(role).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(location).toBeInTheDocument();
    
    
  });
});

describe("Creates a new user", () => {
  const mockSubmit = jest.fn()
  
  it("Filled up form and click", async() => {
    render(
      <Router>
      <UserManagement isLoad={"false"} data={data} onSubmit={mockSubmit}/>
      </Router>
    );

    fireEvent.change(screen.getByTestId("username-mock"),{target:{value:"testuser"}})
    fireEvent.change(screen.getByTestId("dep-mock"),{target:{value:"HR"}})
    fireEvent.change(screen.getByTestId("role-mock"),{target:{value:"Admin"}})
    fireEvent.change(screen.getByTestId("email-mock"),{target:{value:"testuser@metlife.com.bd"}})
    fireEvent.change(screen.getByTestId("location-mock"),{target:{value:"Head office"}})
    fireEvent.click(screen.getByText('Create User'))

    axios.mockResolvedValueOnce({data:{
      username: "testuser",
      email: "testuser@metlife.com.bd",
      roleId:"Admin",
      departmentId: "hr",
      locationId: "Head office",
    }})
    
    await waitFor(()=> expect(axios.toHaveBeenCalled()))
    
  });
});







