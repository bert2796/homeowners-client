import { Avatar, createStyles, Group, Text } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconDownload, IconX } from '@tabler/icons';
import React from 'react';

type Props = {
  files: FileWithPath[];
  onSetFiles: (files: FileWithPath[]) => void;
  avatar: string;
};

export const AvatarUploader: React.FC<Props> = ({
  avatar,
  files,
  onSetFiles,
}) => {
  const { classes, theme } = useStyles();
  const openRef = React.useRef<() => void>(null);

  return (
    <>
      <Text>Avatar</Text>
      <div className={classes.wrapper}>
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          className={classes.dropzone}
          maxFiles={1}
          maxSize={30 * 1024 ** 2}
          multiple={false}
          openRef={openRef}
          radius="md"
          onDrop={onSetFiles}
        >
          <div style={{ pointerEvents: 'none' }}>
            <Group position="center">
              <Dropzone.Accept>
                <IconDownload
                  color={theme.colors[theme.primaryColor][6]}
                  size={50}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX color={theme.colors.red[6]} size={50} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                {!files.length && (
                  <Avatar radius={75} size={150} src={avatar} />
                )}
                {Boolean(files.length) && (
                  <>
                    {files.map((file, index) => {
                      const imageUrl = URL.createObjectURL(file);

                      return (
                        <Avatar
                          key={index}
                          radius={75}
                          size={150}
                          src={imageUrl}
                        />
                      );
                    })}
                  </>
                )}
              </Dropzone.Idle>
            </Group>

            {/* <Text align="center" mt="xl" size="lg" weight={700}>
              <Dropzone.Accept>Drop files here</Dropzone.Accept>
              <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
              <Dropzone.Idle>Upload proof of payment</Dropzone.Idle>
            </Text> */}
            <Text align="center" color="dimmed" mt="xs" size="sm">
              Click to select an image, or drag and drop SVG, PNG or JPG
            </Text>
          </div>
        </Dropzone>
      </div>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  control: {
    bottom: -20,
    left: 'calc(50% - 125px)',
    position: 'absolute',
    width: 250,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  wrapper: {
    position: 'relative',
  },
}));
