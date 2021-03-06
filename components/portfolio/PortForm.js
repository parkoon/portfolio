import Layout from '../window/Layout'
import useFormValidation from '../../hooks/useFormValidation'
import { portfolioValidator } from '../../helpers/validate'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Icon from '../Icon'
import Button from '../Button'
import { useContext } from 'react'
import { windowContext } from '../../context/windowContext'
const INITIAL_VALUE = {
    title: '',
    body: '',
    tech: '',
    techs: [],
    git: '',
    startDate: '',
    endDate: '',
    photos: []
}

const PortForm = ({ onClose, x, y, title }) => {
    const {
        values,
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
        isSubmitting,
        handleStartDateChange,
        handleEndDateChange,
        handleKeyUp,
        deleteTag,
        deleteFile,
        deleteAllTags
    } = useFormValidation(INITIAL_VALUE, portfolioValidator, onClose)

    const windowCtx = useContext(windowContext)

    return (
        <Layout onClose={onClose} x={x} y={y} title={title}>
            <div className="portfolio__form">
                <div className="form__text">
                    <label>제목: </label>
                    <input
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="title"
                        type="text"
                    />

                    {errors.title && <p className="error">{errors.title}</p>}
                </div>
                <div className="form__text">
                    <label>설명: </label>
                    <textarea
                        value={values.body}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={7}
                        name="body"
                    />
                    {errors.body && <p className="error">{errors.body}</p>}
                </div>
                <div className="form__text">
                    <label>날짜: </label>
                    <DatePicker
                        className="datepicker"
                        selected={values.startDate}
                        selectsStart
                        startDate={values.startDate}
                        endDate={values.endDate}
                        onChange={handleStartDateChange}
                        onBlur={handleBlur}
                    />
                    <DatePicker
                        className="datepicker"
                        selected={values.endDate}
                        selectsEnd
                        startDate={values.startDate}
                        endDate={values.endDate}
                        onChange={handleEndDateChange}
                        minDate={values.startDate}
                    />
                    {errors.startDate && (
                        <p className="error">{errors.startDate}</p>
                    )}
                </div>

                <div className="form__text">
                    <label>기술: </label>
                    <input
                        type="text"
                        name="tech"
                        value={values.tech}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                        onBlur={handleBlur}
                    />
                    <Button title="remove" onClick={deleteAllTags} />
                    {errors.tech && <p className="error">{errors.tech}</p>}

                    <div className="tech__tags">
                        <ul>
                            {values.techs.map((tech, index) => (
                                <li
                                    key={index}
                                    onClick={() => deleteTag(index)}
                                >
                                    <div className="tag__title">
                                        {tech}
                                        <Icon name="close" size="s" onCli />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="form__image">
                    <label htmlFor="photos">이미지: </label>
                    <input
                        id="photos"
                        type="file"
                        name="photos"
                        onChange={handleChange}
                    />
                    {values.photos &&
                        values.photos.map((photo, index) => (
                            <div className="image__box" key={index}>
                                <img src={photo.url} />
                                <div>
                                    <span
                                        className="image__name"
                                        onClick={() => deleteFile(photo.id)}
                                    >
                                        {photo.name}
                                    </span>
                                    <Icon name="close" size="s" />
                                </div>
                            </div>
                        ))}

                    {errors.photo && <p className="error">{errors.photo}</p>}
                </div>

                <div className="form__text">
                    <div className="resources--git">
                        <label>저장소 : </label>
                        <input type="text" name="git" onChange={handleChange} />
                    </div>
                </div>
                <div className="form__text">
                    <div className="resources--demo">
                        <label>데모 : </label>
                        <input
                            type="text"
                            name="demo"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form__submit">
                    <Button
                        title="저장"
                        disabled={isSubmitting}
                        className="submit__ok"
                        onClick={handleSubmit}
                    />
                    <Button
                        onClick={onClose}
                        title="취소"
                        className="submit__cancel"
                    />
                </div>
            </div>
        </Layout>
    )
}

export default PortForm
