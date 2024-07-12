const useAccess = (context, api) => {
  const has = (permissions, superuser, accessList, or=false) => {
    if (superuser) {
      return true;
    }

    const userPermissionSet = new Set(accessList);
    const actionPermissionSet = new Set(permissions);

    for (let userPermission of userPermissionSet) {
      const [, model] = userPermission.split("-");
      if (
        userPermissionSet.has(`update-${model}`) ||
        userPermissionSet.has(`delete-${model}`)
      ) {
        userPermissionSet.add(`read-${model}`);
      }
    }

    if (or) {
      return actionPermissionSet.intersection(userPermissionSet).size > 0
    }

    return actionPermissionSet.intersection(userPermissionSet).size ===
      actionPermissionSet.size;


  };

  const verify = (permissions = null, callback = null) => {
    if (!context.auth.isAuthenticated) {
      return;
    }
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    return api.http
      .get(`${import.meta.env.VITE_BASE_URL}/me/access-list`, config)
      .then((response) => {
        const { superuser, accessList } = response.data;
        context.auth.setSuperuser(superuser);
        context.auth.setAccessList(accessList);

        if (permissions) {
          const hasAccessPermissions = has(permissions, superuser, accessList);
          if (hasAccessPermissions) {
            if (callback) {
              callback();
            }
          }
        }
      });
  };

  return {
    has,
    verify,
  };
};

export default useAccess;
