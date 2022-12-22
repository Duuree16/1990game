import styles from "./extra/design.module.css";
import image from "./extra/tank.png";
import { useEffect, useRef, useState } from "react";

export const Tank = () => {
  const [dir, setDir] = useState("none");
  const [look, setLook] = useState("none");
  const [position, setPosition] = useState({ x: 1, y: 0 });
  const tankref = useRef();
  const vel = 1;
  useEffect(() => {
    const downHandle = (e) => {
      switch (e.key) {
        case "w":
          setDir("up");
          setLook("up");
          break;
        case "a":
          setLook("left");
          setDir("left");
          break;
        case "s":
          setLook("down");
          setDir("down");
          break;
        case "d":
          setLook("right");
          setDir("right");
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", downHandle);

    const upHandle = (e) => {
      switch (e.key) {
        case "w":
          if (dir === "up") {
            setDir("none");
            console.log("up");
          }

          break;
        case "a":
          if (dir === "left") {
            setDir("none");
            console.log("left");
          }
          break;
        case "s":
          if (dir === "down") {
            setDir("none");
            console.log("down");
          }
          break;
        case "d":
          if (dir === "right") {
            setDir("none");
            console.log("right");
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keyup", upHandle);

    const ints = setInterval(() => {
      var placehldr = { ...position };
      switch (dir) {
        case "up":
          placehldr.y -= vel;
          break;
        case "down":
          placehldr.y += vel;
          break;
        case "right":
          placehldr.x += vel;
          break;
        case "left":
          placehldr.x -= vel;
          break;
        default:
          break;
      }
      setPosition(placehldr);
    }, 50);

    return () => {
      clearInterval(ints);
      document.removeEventListener("keyup", upHandle);
      document.removeEventListener("keydown", downHandle);
    };
  }, [position]);

  return (
    <div
      className={styles.tankOuter}
      style={{ top: position.y * 5, left: position.x * 5 }}
    >
      <img
        src={image}
        ref={tankref}
        className={[styles.tank, styles[look]].join(" ")}
      />
    </div>
  );
};
