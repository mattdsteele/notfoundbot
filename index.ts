import { LContext } from "./types";
import { gatherFiles, groupFiles, skipGroups, updateFiles } from "./src/util";
import { checkGroups } from "./src/check_groups";
import { checkArchives } from "./src/check_archives";
import { suggestChanges } from "./src/suggest_changes";
import { checkForExisting } from "./src/check_existing";

export async function action(ctx: LContext) {
  await checkForExisting(ctx);
  const files = gatherFiles(ctx);
  const rawGroups = groupFiles(ctx, files);
  const urlGroups = skipGroups(ctx, rawGroups);
  await checkGroups(ctx, urlGroups);
  await checkArchives(urlGroups);
  const updatedFiles = updateFiles(ctx, urlGroups);
  await suggestChanges(ctx, updatedFiles);
}
