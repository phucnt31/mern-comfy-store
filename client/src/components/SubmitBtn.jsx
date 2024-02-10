import React from "react";
import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="btn btn-primary btn-block"
    >
      {isSubmitting ? (
        <span className="loading loading-spinner">sending...</span>
      ) : (
        text || "submit"
      )}
    </button>
  );
};

export default SubmitBtn;
