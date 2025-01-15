"use client";

import { CreateSkill } from "@/actions/CreateSkill";
import { useFormState } from "react-dom";
import { SkillError } from "@/types/SkillError";

export default function SkillForm() {
  const initialState: SkillError = { message: null, errors: {} };
  const [state, formAction] = useFormState<SkillError, FormData>(
    CreateSkill,
    initialState
  );

  return (
    <form action={formAction}>
      <label htmlFor="skill_name">Compétence : </label>
      <input
        type="text"
        name="skill_name"
        id="skill_name"
        placeholder="NextJS"
      />
      {state.errors?.skill_name &&
        state.errors.skill_name.map((error: string) => (
          <p style={{ color: "red" }} key={error}>
            {error}
          </p>
        ))}
      <br />
      <label htmlFor="skill_level">Niveau : </label>
      <br />
      <input
        type="range"
        name="skill_level"
        id="skill_level"
        min="1"
        max="5"
        step="1"
      />
      {state.errors?.skill_level &&
        state.errors.skill_level.map((error: string) => (
          <p style={{ color: "red" }} key={error}>
            {error}
          </p>
        ))}
      <br />
      {!state.errors && state.message && (
        <p style={{ color: "red" }} key={state.message}>
          {state.message}
        </p>
      )}
      <input type="submit" name="skill_add" value="Ajouter" />
    </form>
  );
}
