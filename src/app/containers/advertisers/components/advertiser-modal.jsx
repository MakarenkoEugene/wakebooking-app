import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Input, Button, Checkbox, Autocomplete } from '@components/ui';
import { Grid } from '@material-ui/core';
import { Loading } from '@components/loading/loading';
import './advertiser-modal.scss';

const squads = [
  { id: 'Lightning' },
  { id: 'Thunder' },
  { id: 'Storm' },
  { id: 'SuperSonic' },
];

const checkValid = (data) => Object.values(data).every((v) => v && !!v.toString().trim());

const Component = ({ rootStore: { advertisers }, data, onClose }) => {
  const [state, setState] = useState(data || {
    advertiser: '',
    advertiserId: '',
    squad: '',
    tier: '',
    skipApproval: false,
  });

  const [isValid, setIsValid] = useState(checkValid(state));

  const onChange = (field) => (value) => {
    const newState = { ...state, [field]: value };

    if (field === 'squad') {
      newState.squadId = {
        Lightning: 21148,
        Thunder: 21149,
        Storm: 21420,
        SuperSonic: 21203,
      }[value];
    }

    // trim is not a function
    setIsValid(checkValid(newState));
    setState(newState);
  };

  const submit = async () => {
    const success = await advertisers.save(state);

    if (success) onClose();
  };

  return (
    <Grid container className='add-new-advertiser' spacing={3}>
      <Grid item xs={6}>
        <Input label='Advertiser' onChange={onChange('advertiser')} value={state.advertiser} disabled={advertisers.saving} />
      </Grid>
      <Grid item xs={6}>
        <Input label='Advertiser ID' onChange={onChange('advertiserId')} value={state.advertiserId} disabled={advertisers.saving} />
      </Grid>

      <Grid item xs={6}>
        <Input
          label='Tier'
          value={state.tier}
          type='number'
          inputProps={{ min: 1 }}
          onChange={onChange('tier')}
          disabled={advertisers.saving}
        />
      </Grid>

      <Grid item xs={6}>
        <Autocomplete
          label='Squad'
          placeholder='Squad'
          value={squads.find((s) => s.id === state.squad) || null}
          options={squads}
          optionLabel='id'
          disabled={advertisers.saving}
          onChange={(e, value) => onChange('squad')(value.id)}
        />
      </Grid>

      <Grid item xs={6}>
        <Checkbox
          label='Skip Approval?'
          checked={state.skipApproval}
          onChange={onChange('skipApproval')}
          disabled={advertisers.saving}
        />
      </Grid>

      <Grid item container justify='flex-end' alignItems='center' xs={6}>
        <Button className='submit' disabled={!isValid || advertisers.saving} onClick={submit}>
          {state._id ? 'Save' : 'Add'}
        </Button>
      </Grid>

      {advertisers.saving && <Loading />}
    </Grid>
  );
};

export const AdvertiserModal = inject('rootStore')(observer(Component));