import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { TOOL_ID } from "./constants";
import { IconButton, Icons, TooltipLinkList, WithTooltip } from "@storybook/components";
import type { WithHideFn } from "@storybook/components";

export const Tool = () => {
  const [globals, updateGlobals] = useGlobals();

  const selectTheme = useCallback(
    (selectedTheme: string) => updateGlobals({ selectedTheme }),
    []
  );

  const createLinks = ({ onHide }: WithHideFn) => {
    const { selectedTheme, supportedThemes } = globals;

    return supportedThemes ?
      Object.entries(supportedThemes).map(([id, title]) => ({
        id,
        title,
        active: selectedTheme === id,
        onClick: () => {
          selectTheme(id);
          onHide();
        }
      })) : [{
        id: "no-themes",
        title: "Add supportedThemes in parameters of `.storybook/preview.js`",
        active: false,
        onClick: () => {
          onHide();
        }
      }];
  };

  return (
    <WithTooltip
      key={TOOL_ID}
      placement="top"
      trigger="click"
      closeOnClick={true}
      tooltip={(withHideFn: WithHideFn) => (
        <TooltipLinkList links={createLinks(withHideFn)} />
      )}
    >
      <IconButton
        active={true}
        title="Select theme for switching SCSS"
      >
        💧&nbsp;<span style={{textTransform: 'capitalize'}}>{globals?.selectedTheme || 'Themes'}</span>
      </IconButton>
    </WithTooltip>
  );
};
