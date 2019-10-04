import React, { Component } from "react";
import { logoutUser } from "./../../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Navbar, NavbarBrand } from 'reactstrap';
class Header extends Component {
  constructor(props) {
    super(props);
    
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      logout: false
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  logout = () => {
    this.props.actions.logoutUser();
    window.location.href = "#/login";
  };

  render() {
    const { user } = this.props;
    const site = `Star Wars - Xebia${
      user && user.user ? " ( " + user.user.name + " )" : ""
    }`;
    return (
      <div className="header">
           <Navbar color="faded" light style={{backgroundColor:"#007bff"}}>
          <NavbarBrand href="/" className="mr-auto"  >
          <img src="icon.png" alt="star-war-icon" width="40" height="40" className="mr-4"/>
          {site}</NavbarBrand>
          {user.isLoggedIn ?
          
          <>
            <Button className="btn btn-success col-md-1" onClick={this.logout}>
              Logout
            </Button>
           </>: (
            ""
          )}
        </Navbar>

        {/* <nav className="navbar navbar-expand-lg navbar-light menu">
          <div className="navbar-nav col-md-11">
            <a className="nav-item nav-link active " href={"/"}>
              {site}
              <span className="sr-only">(current)</span>
            </a>
          </div>
          {user.isLoggedIn ? (
            <button className="btn btn-success col-md-1" onClick={this.logout}>
              Logout
            </button>
          ) : (
            ""
          )}
        </nav> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ logoutUser }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
