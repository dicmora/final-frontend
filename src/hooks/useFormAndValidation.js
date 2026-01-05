import { useState, useRef, useCallback, useEffect } from "react";
import { BASE_URL } from "../utils/constants";

const checkEmailAvailability = async (email) => {
  try {
    const res = await fetch(`${BASE_URL}/users/check-email?email=${email}`);
    if (!res.ok) return false;
    const data = await res.json();
    return data.isAvailable;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export function useFormAndValidation(initialValuesProp, options = {}) {
  const { checkEmailAvailabilityEnabled = false } = options;
  const initialValues = useRef(initialValuesProp).current;

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const timeoutRef = useRef(null);

  const validateField = (name, value) => {
    if (name === "email") {
      if (!value.match(/\S+@\S+\.\S+/)) return "Invalid email address";
    }

    return value.trim() ? "" : "This field is required";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      const errorMessage = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));

      if (name === "email" && checkEmailAvailabilityEnabled) {
        setCheckingEmail(true);
        const isAvailable = await checkEmailAvailability(value);
        setCheckingEmail(false);

        if (isAvailable) {
          setWarnings((prev) => ({
            ...prev,
            email: "This Email is not available",
          }));
        } else {
          setWarnings((prev) => ({ ...prev, email: "" }));
          setErrors((prev) => ({
            ...prev,
            email: "This Email is already registered",
          }));
        }
      }
    }, 400);
  };

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setWarnings({});
    setIsValid(false);
    setCheckingEmail(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [initialValues]);

  useEffect(() => {
    const noEmptyFields = Object.values(values).every(
      (v) => (v ?? "").trim() !== ""
    );
    const noErrors = Object.values(errors).every((e) => !e);
    setIsValid(noEmptyFields && noErrors && !checkingEmail);
  }, [values, errors, checkingEmail]);

  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  return {
    values,
    errors,
    warnings,
    isValid,
    checkingEmail,
    handleChange,
    resetForm,
  };
}
