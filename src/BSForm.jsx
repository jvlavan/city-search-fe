import * as React from "react";
import { createRoot } from "react-dom/client";
import { useForm } from "@tanstack/react-form";

import { useNavigate } from "react-router";
import BacktoHome from "./BacktoHome";

function FieldInfo({ field }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

function BSForm() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      CityName: "",
    },

    onSubmit: async ({ value }) => {
      console.log(value);
      console.log(value.CityName);
      navigate("/basic-search", { state: { city_name: value.CityName } });
    },
  });

  return (
    <div>
      <h3>Simple Basic City Search</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="CityName"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "A City name is required"
                  : value.length < 3
                  ? "City name must be at least 3 characters"
                  : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") && 'No "error" allowed in City name'
                );
              },
            }}
            children={(field) => {
              return (
                <>
                  <label htmlFor={field.name}>City Name:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        <div></div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </button>
          )}
        />
      </form>
      <BacktoHome/>
    </div>
  );
}

export default BSForm;
