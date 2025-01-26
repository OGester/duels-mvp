"use client";
import "@/styles/createLeague.css";
import { useState } from "react";
import { createLeagueAction } from "@/app/leagues/new/actions";
import { useFormState } from "../lib/hooks";

export default function CreateLeagueForm() {
  const [state, handleSubmit] = useFormState(createLeagueAction);
  //the options for leagueType existing in the prismaSchema
  //if a ENUM is changed in the database it only needs to be modified in this
  //array not for every option
  const leagueType = ["GLOBAL", "LOCAL"];
  const [isPublic, setIsPublic] = useState(false);

  return (
    <main className="main-container">
      <div className="title-container">
        <h2 className="page-title">CREATE NEW LEAGUE</h2>
      </div>
      <div className="landing-page">
        <div className="form-card">
          <div className="form-title-container">
            <h2 className="form-title">Enter League Info</h2>
          </div>
          <div className="form-wrapper">
            <div className="form-box">
              <div className="form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="nameField" className="form-label">
                      League name
                    </label>
                    <input
                      id="nameField"
                      name="name"
                      type="text"
                      className="leagueName-input"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="typeField" className="form-label">
                      League type
                    </label>
                    <select id="typeField" name="type" className="drop-down ">
                      <option value="" disabled>
                        {" "}
                        Select league type
                      </option>
                      {leagueType.map((type) => (
                        <option key={type} value={type}>
                          {/*converts "GLOBAL" to "Global by making all characters after the first to lowercase*/}
                          {type.charAt(0) + type.slice(1).toLowerCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="startDate" className="form-label">
                      Start date
                    </label>
                    <input
                      id="startDate"
                      name="startDate"
                      type="date"
                      className="start-input"
                      placeholder="YYYY-MM-DD"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endDate" className="form-label">
                      End date
                    </label>
                    <input
                      id="endDate"
                      name="endDate"
                      type="date"
                      className="end-input"
                      placeholder="YYYY-MM-DD"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="descriptionField" className="form-label">
                      Description
                    </label>
                    <textarea
                      id="descriptionField"
                      name="description"
                      type="text"
                      className="description-input"
                      placeholder="League description"
                    />
                  </div>

                  <div className="checkbox-group">
                    <label htmlFor="isPublic" className="isPublic-label">
                      Public League?
                    </label>
                    <input
                      type="checkbox"
                      id="isPublic"
                      name="isPublic"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      className="custom-checkbox "
                    />
                  </div>
                  {Boolean(state.error) && (
                    <p className="text-red-700">{state.error.message}</p>
                  )}
                </form>
              </div>
            </div>
            {/* <div className="description-container"></div> */}
            <div className="cta-section">
              <span className="text-sm text-gray-500">Launch your League?</span>
              <button className="createLeague-button" type="submit">
                Lets Do This
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/*
 */

/* {Boolean(state.error) && (
  <p className="text-red-700">{state.error.message}</p>
)}
<div className="button-container">
  <button className="sign-up-button" type="submit">
    CREATE!
  </button>
</div> */
