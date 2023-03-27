import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";

export default function Navigation(){
    return(
        <Navbar bg="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse>
                <Nav>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/department">
                        Отделы
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                        Сотрудники
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/vacation">
                        Отпуска
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/businesstrip">
                        Командировки
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
