import { system, world, CommandPermissionLevel } from "@minecraft/server";
import { openAHMenu } from "../ui/ahMainMenu.js";

const COMMAND_NAME = "donutsmp:ah";

function openMenu(player) {
    system.run(() => {
        openAHMenu(player, 1);
    });
}

system.beforeEvents.startup.subscribe((init) => {
    try {
        init.customCommandRegistry.registerCommand(
            {
                name: COMMAND_NAME,
                description: "Open DonutSMP Auction House",
                permissionLevel: CommandPermissionLevel.Any,
                cheatsRequired: false
            },
            (origin) => {
                const player = origin?.sourceEntity ?? origin?.initiator;

                if (!player || player.typeId !== "minecraft:player") {
                    return;
                }

                openMenu(player);
            }
        );
    } catch (error) {
        console.warn(`[DonutSMP] Failed to register custom command: ${error}`);
    }
});

world.beforeEvents.chatSend.subscribe((event) => {
    const msg = event.message.trim();

    if (msg !== "/ah") return;

    event.cancel = true;
    openMenu(event.sender);
});
