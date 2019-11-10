/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ComponentProps, Fragment } from "react";
import { Link, LinkProps, Route, BrowserRouter } from "react-router-dom";

type ButtonVariant = "default" | "call-to-action";

interface ButtonCommonProps {
  variant?: ButtonVariant;
}

interface ButtonAsLinkProps extends Omit<LinkProps, "to">, ButtonCommonProps {
  linkTo: LinkProps["to"];
}

interface ButtonAsButtonProps
  extends ComponentProps<"button">,
    ButtonCommonProps {
  linkTo?: never;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export const Button = ({ variant = "default", ...rest }: ButtonProps) => {
  const styles = [
    buttonStyles,
    variant === "call-to-action"
      ? { background: "coral" }
      : { textDecoration: "underline" }
  ];

  if (rest.linkTo !== undefined) {
    const { linkTo, ...linkProps } = rest;
    return <Link to={linkTo} css={styles} {...linkProps} />;
  }

  return <button type="button" css={styles} {...rest} />;
};

const buttonStyles = {
  background: "linen",
  border: "none",
  borderRadius: 5,
  padding: "1em 0.7em",
  fontFamily: "system-ui",
  fontSize: "inherit",
  color: "inherit",
  textDecoration: "none",
  boxShadow: "0 -3px rgba(0,0,0,0.2) inset",
  cursor: "pointer",
  ":focus, :hover": {
    boxShadow: "0 -2px rgba(0,0,0,0.2) inset"
  }
};

// eslint-disable-next-line import/first
import { render } from "react-dom";

render(
  <div>
    <BrowserRouter>
      <Route exact path="/">
        <Fragment>
          <Button css={{ margin: "1em" }} onClick={() => console.log("login")}>
            Login
          </Button>
          <Button
            variant="call-to-action"
            onClick={() => console.log("join the movement!")}
            linkTo="/sign-in"
          >
            Join the movement!
          </Button>
        </Fragment>
      </Route>
      <Route path="/sign-in">
        <Link to="/">go back</Link>
      </Route>
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);
