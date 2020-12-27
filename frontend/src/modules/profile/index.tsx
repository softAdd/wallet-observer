import React, { useCallback, useState } from 'react';
import { Button, Box, Select, MenuItem, Typography } from '@material-ui/core';
import { requestLogoutFx } from 'common/models/auth/store';
import { useTranslation } from 'react-i18next';
import { LANGS } from 'common/constants';

type LangType = typeof LANGS[number];

const Profile = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<LangType>(localStorage.getItem('selectedLang') as LangType || 'en');
  // eslint-disable-next-line
  const selectLanguage = useCallback((evt: any) => {
    const nextLang = evt.target.value as LangType;
    setLang(nextLang);
    localStorage.setItem('selectedLang', nextLang);
    i18n.changeLanguage(nextLang);
  }, [i18n]);

  return (
    <Box p={3} display="flex" flexDirection="column" alignItems="flex-start">
      <Typography variant="caption">
        {t('Select language')}
      </Typography>
      <Select
        variant="outlined"
        margin="dense"
        value={lang}
        onChange={selectLanguage}
        style={{
          minWidth: 200
        }}
      >
        {LANGS.map((existedLang) => (
          <MenuItem key={existedLang} value={existedLang}>
            {existedLang}
          </MenuItem>
        ))}
      </Select>
      <Box mt={2}>
        <Button variant="contained" onClick={() => requestLogoutFx()} style={{ minWidth: 200 }}>
          {t('Logout')}
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
