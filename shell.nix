let
  pkgs = import (builtins.fetchTarball "https://github.com/NixOS/nixpkgs/archive/e73de5be04e0eff4190a1432b946d469c794e7b4.tar.gz") {
    config = {};
    overlays = [];
  };

  inherit (pkgs) lib;
in

pkgs.mkShell {
  name = "oat-scavengers-mspa";
  packages = with pkgs; [
    nodejs
    pnpm
    typescript-language-server
    vscode-langservers-extracted
  ];

  env.BIOME_BINARY = lib.getExe pkgs.biome;
}
