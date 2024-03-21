import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Popup = ({ message, onClose }) => {
  return (
    <Overlay>
      <Content>
        <Message>{message}</Message>
        <Button onClick={onClose}>Close</Button>
        <Link to="/signup">
          <SignUpButton>Signup</SignUpButton>
        </Link>
      </Content>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const Message = styled.p`
  font-size: 22px;
  margin-bottom: 25px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 50px;
`;

const SignUpButton = styled(Button)`
  margin-left: 15px;
`;

export default Popup;
