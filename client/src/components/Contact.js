import React from "react";
import styled from "styled-components";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const ContactContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  flex-direction: column;
  height: 70vh;
  gap: 3em;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin: 20px 0;
`;

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const Infos = styled.div`
gap: 2em;
display: flex;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 1em;
`;

const FormInput = styled.input`
  padding: 10px;
  flex: 1;
  // margin-right: 10px;
`;

const FormTextarea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  resize: none;
`;

const SubmitButton = styled.button`
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition-duration: 0.5s;
  border: 3px solid black;
  font-size: larger;

  &:hover {
    background-color: white;
    color: black;
    
  }
`;

const Contact = () => {
  return (
    <ContactContainer>
      <Title>NOUS JOINDRE</Title>
      <Infos>
        <ContactInfoContainer>
          <InfoItem>
            <p>Adresse</p>
            <p>Phone</p>
            <IconContainer>
              <FaFacebookF size={20} />
              <FaInstagram size={20} />
              <FaLinkedinIn size={20} />
            </IconContainer>
          </InfoItem>
        </ContactInfoContainer>

        <FormContainer>
          <FormRow>
            <FormInput type="text" placeholder="Nom" />
            <FormInput type="text" placeholder="Prénom" />
          </FormRow>
          <FormRow>
            <FormInput type="text" placeholder="Sujet" />
            <FormInput type="email" placeholder="Courriel" />
          </FormRow>
          <FormTextarea placeholder="Message" rows="4" />
          <SubmitButton type="submit">Submit</SubmitButton>
        </FormContainer>
      </Infos>
    </ContactContainer>
  );
};

export default Contact;
