"use client";

import { UseDelete } from "@/hooks/useDelete";
import { UseFetch } from "@/hooks/useFetch";
import { UsePatch } from "@/hooks/usePatch";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

function FixCourse() {
  const [fixUpdate, setFixUpdate] = useState(false);
  const [fixDelete, setFixDelete] = useState(false);

  const FetchFixUpdate = UseFetch();
  const FetchFixDelete = UseFetch();

  const FixUpdate = UsePatch();
  const FixDelete = UseDelete();

  const HandleFetchFixUpdate = async () => {
    const res = await FetchFixUpdate.Fetch("/courses/fix-update");

    if (res) {
      if (res.success) {
        setFixUpdate(true);
      }
    }
  };

  const HandleFetchFixDelete = async () => {
    const res = await FetchFixDelete.Fetch("/courses/fix-delete");

    if (res) {
      if (res.success) {
        setFixDelete(true);
      }
    }
  };

  const HandleFixUpdate = async () => {
    const res = await FixUpdate.Patch("/courses/fix-update", {});
    if (res) {
      if (res.success) {
        setFixUpdate(false);
      }
    }
  };

  const HandleFixDelete = async () => {
    const res = await FixDelete.Delete("/courses/fix-delete");

    if (res) {
      if (res.success) {
        setFixDelete(false);
      }
    }
  };

  useEffect(() => {
    HandleFetchFixUpdate();
    HandleFetchFixDelete();
  }, []);
  return (
    <div>
      {!FetchFixUpdate.loading ? (
        <div>
          {fixUpdate ? (
            <div>
              <h4>incomplete course update found</h4>
              <button type="button" onClick={HandleFixUpdate}>
                fix now
              </button>
            </div>
          ) : (
            <>
              {FetchFixUpdate.error && (
                <div className="retry">
                  <p>{FetchFixUpdate.error}</p>
                  <button type="button" onClick={HandleFetchFixUpdate}>
                    <RotateCcw size={20} />
                    retry
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="loading">
          <p>scanning update...</p>
          <ClipLoader size={50} color="var(--bg-txt-color)" />
        </div>
      )}

      {!FetchFixDelete.loading ? (
        <div>
          {fixDelete ? (
            <div>
              <h4>incomplete course delete found</h4>
              <button type="button" onClick={HandleFixDelete}>
                fix now
              </button>
            </div>
          ) : (
            <>
              {FetchFixDelete.error && (
                <div className="retry">
                  <p>{FetchFixDelete.error}</p>
                  <button type="button" onClick={HandleFetchFixDelete}>
                    <RotateCcw size={20} />
                    retry
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="loading">
          <p>scanning delete...</p>
          <ClipLoader size={50} color="var(--bg-txt-color)" />
        </div>
      )}
    </div>
  );
}

export default FixCourse;
