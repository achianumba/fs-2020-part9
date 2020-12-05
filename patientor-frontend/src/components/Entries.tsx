import React from "react";
import { useStateValue } from "../state";
import { Entry } from "../types";
import { Card, Icon } from "semantic-ui-react";

const Entries: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  const [{ diagnosis }] = useStateValue();

  if (!entries) {
    return <></>;
  }

  return (
    <>
      {entries.map(({ date, description, diagnosisCodes, type }, i) => {
        return (
          <React.Fragment key={i}>
            <Card fluid style={{ padding: "16px" }}>
              {date && (
                <Card.Header>
                  <strong>{date}</strong>{" "}
                  {type === "HealthCheck" ? (
                    <Icon name="doctor" />
                  ) : type === "OccupationalHealthcare" ? (
                    <Icon name="stethoscope" />
                  ) : type === "Hospital" ? (
                    <Icon name="hospital outline" />
                  ) : (
                    ""
                  )}
                </Card.Header>
              )}
              {description && (
                <Card.Description>{description}</Card.Description>
              )}
              {diagnosisCodes && diagnosisCodes?.length > 0 && (
                <ul>
                  {diagnosisCodes.map((code, i) => {
                    return (
                      code && (
                        <li key={i}>
                          {code}: {diagnosis[code]?.name}
                        </li>
                      )
                    );
                  })}
                </ul>
              )}
            </Card>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Entries;
