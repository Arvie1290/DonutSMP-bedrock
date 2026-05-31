import {
    world
} from "@minecraft/server";

import {
    openAHMenu
} from "../ui/ahMainMenu.js";

world.beforeEvents.chatSend.subscribe(
    (event) => {
        const {
            sender,
            message
        } = event;

        if (
            message !== "/ah"
        ) {
            return;
        }

        event.cancel = true;

        openAHMenu(
            sender,
            1
        );
    }
);
