import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PageWrapper from "../components/PageWrapper";
import ApiMessage from "../components/ApiMessage";
import GroupsSkeleton from "../components/ui/GroupsSkeleton";
import { useMyGroups } from "../hooks/useMyGroups";
import { Share2, Plus, RefreshCw } from "lucide-react";
import ShareModal from "../components/ShareModal";

const mapGroupsLoadError = (error) => {
  const status = error?.status ?? error?.response?.status;

  if (status === 401) return "Please sign in to view your groups.";
  if (error?.isTimeout)
    return "Loading groups took too long. Please try again.";
  if (error?.isNetworkError)
    return "Network issue. Please check your connection and try again.";

  return "Unable to load your groups right now. Please try again.";
};

const Groups = () => {
  const [joinToken, setJoinToken] = useState("");
  const [activeShare, setActiveShare] = useState(null);

  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch } =
    useMyGroups();


  useEffect(() => {
    if (!import.meta.env.DEV) return undefined;
    console.debug("[stability] Groups mounted");
    return () => {
      console.debug("[stability] Groups unmounted");
    };
  }, []);

  const normalizedJoinToken = useMemo(() => joinToken.trim(), [joinToken]);
  const groups = useMemo(() => data?.groups || [], [data]);
  const hasGroups = groups.length > 0;

  const handleJoinGroup = () => {
    if (!normalizedJoinToken) return;
    navigate(`/join/${encodeURIComponent(normalizedJoinToken)}`);
  };

  if (isLoading && !data) {
    return (
      <PageWrapper>
        <GroupsSkeleton />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
        <div className="py-28 px-6  bg-linear-to-b from-neutral-800 via-neutral-950 to-black">
          <div className="max-w-4xl mx-auto space-y-16 ">

          {/* HEADER */}
          <div>
            <h1 className="font-f1 text-4xl md:text-6xl font-black tracking-tight uppercase leading-none mb-6 bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Your Groups
            </h1>
            <p className="text-lg text-muted-foreground">Compete privately with friends</p>

          </div>

          {/* GROUPS CARD */}
          <div className="bg-background/80 backdrop-blur-sm border border-border/80 rounded-2xl p-8 animate-gridlockFadeIn">


            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-2">Your Groups</p>
                <h2 className="font-f1 text-2xl md:text-3xl font-bold uppercase tracking-[0.15em] text-foreground mb-8">Groups List</h2>
              </div>


              <div className="flex items-center gap-3">
                <Button onClick={() => refetch()}>
                  <RefreshCw size={16} />
                </Button>
              </div>
            </div>

            {isError && (
              <div className="space-y-4">
                <ApiMessage
                  variant="error"
                  message={mapGroupsLoadError(error)}
                />
                <Button onClick={() => refetch()}>Retry</Button>
              </div>
            )}

            {data?.groups && !isError && !hasGroups && (
              <p className="text-muted-foreground py-12 text-center">No groups yet. Create your first group.</p>
            )}


            {data?.groups && !isError && hasGroups && (
              <div className="space-y-4">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="border border-border/50 hover:border-primary/50 bg-secondary/30 backdrop-blur-sm rounded-xl p-6 transition-all duration-200 animate-gridlockFadeIn"

                  >

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="font-f1 text-lg font-bold text-foreground mb-1">{group.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Role: <span className="font-semibold">{group.role ?? "—"}</span> • Members: {group.memberCount ?? 0}
                        </p>

                      </div>

                      <Button onClick={() => navigate(`/home/groups/${group.id}`)}>
                        Open
                      </Button>
                    </div>

                    {group.inviteToken && (
                      <div className="mt-3">
                        <Button
                          onClick={() => {
                            const link = `${window.location.origin}/join/${encodeURIComponent(
                              group.inviteToken,
                            )}`;
                            setActiveShare({
                              link,
                              name: group.name,
                            });
                          }}
                        >
                          <span className="flex items-center gap-2">
                            <Share2 size={16} />
                            Invite Friends
                          </span>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ACTIONS CARD */}
          <div className="bg-background/80 backdrop-blur-sm border border-border/80 rounded-2xl p-8 animate-gridlockFadeIn">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-2">Quick Actions</p>
              <h2 className="font-f1 text-2xl md:text-2xl font-bold uppercase tracking-[0.15em] text-foreground mb-8">Create or Join Group</h2>
            </div>

              <div className="flex flex-col md:flex-row gap-6">

              <Button onClick={() => navigate("/home/groups/create")}>
                <span className="flex items-center gap-2">
                  <Plus size={16} />
                  Create Group
                </span>
              </Button>

              <div className="flex flex-col sm:flex-row w-full gap-3 md:w-auto min-w-0">
                <input
                  type="text"
                  placeholder="Enter invite token"
                  value={joinToken}
                  onChange={(e) => setJoinToken(e.target.value)}
                  className="min-w-0 flex-1 bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground transition-colors"
                />

                <Button
                  onClick={handleJoinGroup}
                  disabled={!normalizedJoinToken}
                >
                  Join
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={!!activeShare}
        inviteLink={activeShare?.link}
        groupName={activeShare?.name}
        onClose={() => setActiveShare(null)}
      />
    </PageWrapper>
  );
};

export default Groups;
