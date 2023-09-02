import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const LoginContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Form = styled.form`
  margin-top: 2rem;
  width: 40%;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  height: auto;
  overflow: hidden;
  max-height: ${(props) => (props.visible ? "100px" : "0")};
  transition: opacity 0.5s ease, max-height 0.5s ease;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #555;
`;

const CheckboxInput = styled.input`
  margin-right: 0.5rem;
`;

const Button = styled.button`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ToggleFormButton = styled.button`
  font-size: 0.875rem;
  color: #555;
  background: none;
  border: none;
  cursor: pointer;
`;

const Error = styled.h2`
color: red;
`;

const Success = styled.h2`
color: green;
`;

const Login = () => {
  const [formType, setFormType] = useState("login");
  const [showSignUpFields, setShowSignUpFields] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { t } = useTranslation();


  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    promoCode: "",
  });

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMsg("");
    setErrorMsg("");

    if (formType === "signup" && formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords don't match");
      return;
    }
  
    const apiUrl = formType === "login" ? "/api/login" : "/api/signup";
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
  
      if (response.ok) {
        console.log("API call successful");
        setSuccessMsg(data.message);

        const user = data.user;

        document.cookie = `user=${JSON.stringify(user._id)}; max-age=${60 * 60 * 24}; path=/`;

        setTimeout(function() {
          navigate("/welcome");
          window.location.reload();
        }, 2500);
      } else {
        console.error("API call failed");
        setErrorMsg(data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMsg("An error occurred:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormToggle = () => {
    setFormType((prevType) => (prevType === "login" ? "signup" : "login"));
  };

  const handleSignUpClick = () => {
    setShowSignUpFields(true);
  };

  return (
    <div className="login-page" style={{ backgroundColor: "#fff" }}>
      <LoginContainer>
        <h2>{formType === "login" ? t("login") : t("signUp")}</h2>
        {errorMsg != "" ? <Error>{errorMsg}</Error> : <></>}
        {successMsg != "" ? <Success>{successMsg}</Success> : <></>}
        <Form onSubmit={handleSubmit}>
          {formType === "signup" && (
            <FormGroup visible={showSignUpFields}>
              <Label htmlFor="fullName">{t("fullNameLabel")}</Label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          )}

          <FormGroup visible={true}>
            <Label htmlFor="email">{t("emailLabel")}</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup visible={true}>
            <Label htmlFor="password">{t("passwordLabel")}</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          {formType === "signup" && (
            <FormGroup visible={showSignUpFields}>
              <Label htmlFor="confirmPassword">{t("confirmPasswordLabel")}</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          )}

          {formType === "signup" && (
            <FormGroup visible={showSignUpFields}>
              <Label htmlFor="promoCode">{t("promoCodeLabel")}</Label>
              <Input
                type="text"
                id="promoCode"
                name="promoCode"
                value={formData.promoCode}
                onChange={handleInputChange}
              />
            </FormGroup>
          )}

          {formType === "signup" && (
            <FormGroup visible={showSignUpFields}>
              <CheckboxLabel htmlFor="termsAgreement">
                <CheckboxInput type="checkbox" id="termsAgreement" required />{t("termsAgreementLabel")}</CheckboxLabel>
            </FormGroup>
          )}

          <Button type="submit">
            {formType === "login" ? t("login") : t("signUp")}
          </Button>
        </Form>

        <div className="toggle-form">
          <ToggleFormButton
            onClick={() => {
              handleSignUpClick();
              handleFormToggle();
            }}
          >
            {formType === "login" ? t("loginInstead") : t("signUpInstead")}
          </ToggleFormButton>
        </div>
      </LoginContainer>
    </div>
  );
};

export default Login;
