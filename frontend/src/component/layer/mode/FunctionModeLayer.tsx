import style from "./functionModeLayerStyle.module.css";
import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import ThemeSyncSwitchButton from "../../button/theme/ThemeSyncSwitchButton";
import FlatArrow from "../../svg/arrow/FlatArrow";
import { useAppDispatch } from "../../../app/hook";
import { switchMode } from "../../../feature/function/functionModeSlice";
import { functionModeType } from "../../../feature/function/functionModeType";

type functionModePanelProps = {};
const FunctionModeLayer = (props: functionModePanelProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className={style.container_div}>
        <div className={style.nav_div}>
          {/* <NavLink
            className={style.mode_navlink}
            to={""}
            onClick={(x) => props.onNavLinkClick("record")}
          >
            <nav style={{ color: theme.backgroundColor }}>RECORD</nav>
          </NavLink> */}
          <NavLink
            className={style.mode_navlink}
            to={"login"}
            onClick={(x) =>
              dispatch(switchMode({ mode: functionModeType.Login }))
            }
          >
            <nav>LOGIN / SIGNIN</nav>
          </NavLink>

          <NavLink
            className={style.mode_navlink}
            to={"analysis"}
            onClick={(x) =>
              dispatch(switchMode({ mode: functionModeType.Analysis }))
            }
          >
            <nav>ANALYSIS</nav>
          </NavLink>

          <div className={style.theme_div}>
            <ThemeSyncSwitchButton />
            <NavLink
              className={style.mode_navlink}
              to={"customize"}
              onClick={(x) =>
                dispatch(switchMode({ mode: functionModeType.Customize }))
              }
            >
              <nav>CUSTOMIZE</nav>
            </NavLink>
          </div>
        </div>
        <div className={style.arrow_div}>
          <FlatArrow />
        </div>
      </div>
    </>
  );
};
export default FunctionModeLayer;
