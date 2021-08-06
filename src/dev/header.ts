IMPORT("BlockEngine");
IMPORT("ChargeItem");
IMPORT("ToolLib");

const BlockSide = Native.BlockSide;

ICore.Sound.setResourcePath(__dir__ + "assets/sounds/");
ICore.Sound.registerSound("ToolChange", "ToolChange.ogg");